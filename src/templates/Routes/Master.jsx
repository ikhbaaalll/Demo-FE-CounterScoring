import React from "react";
import { Route, Routes } from "react-router";

import { ROUTE_MASTER } from "@routes/routes";

const Master = () => {
	return (
		<>
			<Routes>
				{ROUTE_MASTER.map(({ path, Component }, key) => (
					<Route key={key} path={path} element={<Component />} />
				))}
			</Routes>
		</>
	);
};

export default Master;
