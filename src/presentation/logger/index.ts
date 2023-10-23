
// import { Logger as ProductionItemsLogger } from './productionItemsLogger';

import { itemsLogger } from "./exmple-logger";

let logger = null;


if (process.env.NODE_ENV !== 'production') {
    logger =  itemsLogger();
}



// if (process.env.NODE_ENV === 'production') {
//     logger = new ProductionItemsLogger();
// }

export default logger;
