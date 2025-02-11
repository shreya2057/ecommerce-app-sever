import { JwtPayload } from "jsonwebtoken";
export interface JwtPayloadWithId extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
