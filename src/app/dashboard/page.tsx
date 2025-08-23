"use client";

import React, { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

type ConstructionItem = {
	id: string;
	name: string;
	status: "planned" | "ongoing" | "completed";
	lat: number;
	lng: number;
	description?: string;
};

declare global {
	interface Window {
		mappls: {
			Map: new (container: string, options: Record<string, unknown>) => unknown;
			Marker: (options: Record<string, unknown>) => unknown;
		};
	}
}

const Dashboard: React.FC = () => {
	const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
	const [isAuthed, setIsAuthed] = useState<boolean>(false);
	const [mapLoaded, setMapLoaded] = useState<boolean>(false);
	const [map, setMap] = useState<unknown>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<"latest" | "historical">("latest");

	const mockConstructions: ConstructionItem[] = useMemo(
		() => [
			{
				id: "1",
				name: "Metro Line Extension",
				status: "ongoing",
				lat: 28.6139,
				lng: 77.209,
				description: "Section 3 civil works in progress",
			},
			{
				id: "2",
				name: "Flyover Rehabilitation",
				status: "planned",
				lat: 28.5355,
				lng: 77.391,
				description: "Bearing replacement scheduled",
			},
		],
		[]
	);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			setIsAuthed(Boolean(u));
			setLoadingAuth(false);
		});
		return () => unsub();
	}, []);

	useEffect(() => {
		const loadToken = async () => {
			try {
				const res = await fetch("/api/mappls/token");
				const json = await res.json();
				if (json?.access_token) setAccessToken(json.access_token);
			} catch {}
		};
		loadToken();
	}, []);

	useEffect(() => {
		if (!mapLoaded || !accessToken || !window.mappls) return;
		const mapObj = new window.mappls.Map("map-container", {
			center: [28.6139, 77.2090],
			zoom: 11,
			traffic: true,
			zoomControl: true,
		});
		setMap(mapObj);
	}, [mapLoaded, accessToken]);

	useEffect(() => {
		if (!map) return;
		if (viewMode === "latest") {
			try {
				map.addTraffic();
			} catch {}
		} else {
			try {
				map.removeTraffic();
			} catch {}
		}
	}, [map, viewMode]);

	useEffect(() => {
		if (!map || !window.mappls) return;
		mockConstructions.forEach((c) => {
			try {
				window.mappls.Marker({
					map,
					position: { lat: c.lat, lng: c.lng },
					popupHtml: `<div><strong>${c.name}</strong><br/>Status: ${c.status}<br/>${c.description || ""}</div>`,
					icon: c.status === "ongoing" ? "https://maps.mappls.com/images/2.png" : undefined,
				});
			} catch {}
		});
	}, [map, mockConstructions]);

	if (loadingAuth) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

	if (!isAuthed) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Please log in to view the dashboard.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Mappls JS and CSS */}
			{accessToken && (
				<Script
					src={`https://apis.mappls.com/advancedmaps/api/${process.env.NEXT_PUBLIC_MAPPLS_MAP_KEY}/map_sdk?layer=vector&v=3.0&libraries=services`}
					onLoad={() => setMapLoaded(true)}
					strategy="afterInteractive"
				/>
			)}

			<div className="p-4 flex gap-4 items-center">
				<h1 className="text-2xl font-semibold">City Dashboard</h1>
				<div className="ml-auto flex items-center gap-2">
					<label className="text-sm">View:</label>
					<select
						value={viewMode}
						onChange={(e) => setViewMode(e.target.value as any)}
						className="border rounded px-2 py-1"
					>
						<option value="latest">Latest traffic</option>
						<option value="historical">Historical compare</option>
					</select>
				</div>
			</div>

			<div id="map-container" style={{ height: "70vh", width: "100%" }} />

			<div className="p-4">
				<h2 className="text-lg font-medium">Construction projects</h2>
				<ul className="list-disc pl-5">
					{mockConstructions.map((c) => (
						<li key={c.id}>
							<button
								className="underline"
								onClick={() => {
									if (!map || !window.mappls) return;
									map.setCenter({ lat: c.lat, lng: c.lng });
									map.setZoom(14);
								}}
							>
								{c.name} - {c.status}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;


