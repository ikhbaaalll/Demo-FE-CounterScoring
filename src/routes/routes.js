import BusinessUnit from "@pages/Master/BusinessUnit";
import Location from "@pages/Master/Location";
import Player from "@pages/Master/Player";
import Track from "@pages/Master/Track";

import Match from "@pages/Match/Match/Match";

export const ROUTE_MASTER = [
	{
		title: "Player",
		path: "players",
		fullPath: "/master/players",
		Component: Player,
	},
	{
		title: "Location",
		path: "locations",
		fullPath: "/master/locations",
		Component: Location,
	},
	{
		title: "Business Unit",
		path: "business-units",
		fullPath: "/master/business-units",
		Component: BusinessUnit,
	},
	{
		title: "Track",
		path: "tracks",
		fullPath: "/master/tracks",
		Component: Track,
	},
];

export const ROUTE_MATCH = [
	{
		title: "Match",
		path: "matches",
		fullPath: "/matches",
		Component: Match,
		isNavbar: true,
	},
	{
		title: "Match Details",
		path: "matches/:matchId",
		fullPath: "/matches/:matchId",
		Component: Match,
	},
];
