import { JwtPayload } from "jsonwebtoken";
export interface JwtPayloadWithId extends JwtPayload {
  id: string;
}
