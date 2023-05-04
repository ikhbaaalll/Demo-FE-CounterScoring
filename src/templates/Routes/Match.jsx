import React from "react";
import { Route, Routes } from "react-router";

import { ROUTE_MATCH } from "@routes/routes";

const Match = () => {
	return (
		<>
			<Routes>
				{ROUTE_MATCH.map(({ path, Component }, key) => (
					<Route key={key} path={path} element={<Component />} />
				))}
			</Routes>
		</>
	);
};

export default Match;
