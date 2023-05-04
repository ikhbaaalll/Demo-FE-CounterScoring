import React from "react";
import { useLocation } from "react-router";

import { Spinner } from "@components/moleculs";

export default function Loading() {
	const stateNavigation = useLocation();

	return (
		<div className="w-screen h-screen">
			<Spinner text={stateNavigation.state?.loading ?? "Loading..."} />
		</div>
	);
}
