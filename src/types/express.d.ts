declare namespace Express {
    interface Request {
      user?: AdminModel | null;
      outletId?: string;
    }
  }
  
