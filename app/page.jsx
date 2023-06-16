import { getServerSession } from "next-auth"
import { AuthOptions } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
export default async function Home ()  {
  const session=await getServerSession(authOptions)
  return (
    <div>
      <h1><b>hello</b></h1>
      <h1>Server Side Rendering</h1>
      
    </div>
  )
}

