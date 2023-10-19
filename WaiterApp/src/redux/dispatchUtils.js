import { FETCH_STATUSES, FETCH_TABLES } from "../utils/fields";

export const dispatchFetchedTables = payload => ({type: FETCH_TABLES, payload: payload});

export const dispatchFetchedStatuses = payload => ({type: FETCH_STATUSES, payload: payload});