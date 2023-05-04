import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Template from "@templates/Template";
import Master from "@templates/Routes/Master";
import Match from "@pages/Match/Match/Match";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Template />}>
					<Route path="/master/*" element={<Master />} />
					<Route path="/matches/*" element={<Match />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
