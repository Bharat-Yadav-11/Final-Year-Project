import { auth } from "@clerk/nextjs";

export default async function handler(req, res) {
  const user = await auth();

  if (!user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  console.log("Clerk tokenIdentifier:", user.userId); // tumhara tokenIdentifier
  res.status(200).json({ userId: user.userId });
}
