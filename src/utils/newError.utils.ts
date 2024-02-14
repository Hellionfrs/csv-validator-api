export default class ExpressReviewsError extends Error{
  statusCode: number;
  type: string;
  details:string;
  timesTamp: string;
  techInfo: string;
  constructor(message: string, statusCode:number, type: string, error?: any, details?: string){
      super(message);
      this.statusCode = statusCode || 500;
      this.type = type || "GeneralError";
      this.details = details || '';
      this.timesTamp = new Date().toISOString();
      const errorMessge = error instanceof Error ? error.message : "Detalles no disponibles";
      this.techInfo=errorMessge;
  }
};