import { UnAuthenticatedError } from "../errors/index.js";

export default function checkPermissions(requestUser, resourceUserId) {
  // if (requestUser.role === 'admin') return   // alternative approach
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to access this route");
}
