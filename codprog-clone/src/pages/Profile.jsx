import { requireAuth } from "../utilis/requireAuth";

export function profileLoader({request})
{
  const redirectTo = new URL(request.url).pathname;
  requireAuth({redirectTo});
  return null

}
function Profile() {
  return (
    <div>Profile</div>
  )
}

export default Profile