// import { logger as ProductionItemsLogger } from './exmple-logger';

import { ReservationLogger } from "./activity-logger"

let logger: any | null = null;

if (process.env.NODE_ENV !== 'production') {
    logger = ReservationLogger();
}

// if (process.env.NODE_ENV === 'production') {
//     logger = new ProductionItemsLogger();
// }

export default logger;
