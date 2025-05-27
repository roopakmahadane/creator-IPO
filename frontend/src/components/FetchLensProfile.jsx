import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

const LENS_API = "https://api-v2.lens.dev/";

export default function FetchLensProfile() {
  const { address, isConnected } = useAccount();

  const { signMessageAsync } = useSignMessage()

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProfile() {
    if (!address) {
      setError("Wallet not connected");s
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      // 1. Get challenge
      const challengeRes = await fetch(LENS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
           mutation Challenge($request: ChallengeRequest!) {
  challenge(request: $request) {
    text
    id
  }
}
          `,
          variables: {
            "request": {
              "onboardingUser": {
                "app": "0x8A5Cc31180c37078e1EbA2A23c861Acf351a97cE",
                "wallet": "0xe91429169542837A43C70CacFAFBAA5D7e8e63C7"
              }
            }
          },
        }),
      });

      const challengeJson = await challengeRes.json();
  const challenge = challengeJson.data.challenge;
  console.log("challenge json", challengeJson);

      // 2. Sign challenge
      const signature = await signMessageAsync({ message: challenge.text })

      // 3. Authenticate to get access token
      const authRes = await fetch(LENS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
           mutation Authenticate($request: SignedAuthChallenge!) {
  authenticate(request: $request) {
    ... on AuthenticationTokens {
      accessToken
      refreshToken
    }
  }
}
          `,
          variables: {
            request: {
              id: challenge.id,
              signature,
            },
          },
        }),
      });

      const authJson = await authRes.json();
      const accessToken = authJson.data.authenticate.accessToken;


      // 4. Query 'me' profile with auth token
      const meRes = await fetch(LENS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: `
            query Me {
  me {
    loggedInAs {
      ... on AccountManaged {
        account {
          metadata {
            name
            bio
            picture
            coverPicture
          }
        }
      }
    }
  }
}
          `,
        }),
      });

      const meJson = await meRes.json();
      console.log(meJson);
      setProfile(meJson.data.me);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }

  if (!isConnected) {
    return <p>Please connect your wallet first</p>;
  }

  return (
    <div className="p-4">
    <button
      className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={fetchProfile}
      disabled={loading}
    >
      {loading ? "Fetching profile..." : "Fetch Lens Profile"}
    </button>
  
    {error && <p className="text-red-500 mt-4">{error}</p>}
  
    {profile ? (
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Profile Info</h2>
  
        <p className="mb-2">
          <span className="font-semibold">Name:</span>{" "}
          {profile.name || "N/A"}
        </p>
  
        <p className="mb-2">
          <span className="font-semibold">Bio:</span>{" "}
          {profile.bio || "N/A"}
        </p>
  
        {profile.picture && (
          <div className="mb-4">
            <span className="font-semibold block">Picture:</span>
            <img
              src={profile.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full mt-2 object-cover"
            />
          </div>
        )}
  
        {profile.coverPicture && (
          <div>
            <span className="font-semibold block">Cover Picture:</span>
            <img
              src={profile.coverPicture}
              alt="Cover"
              className="w-full max-w-md rounded mt-2"
            />
          </div>
        )}
      </div>
    ) : (
      !loading && <p className="mt-4 text-gray-600">No profile found</p>
    )}
  </div>
  
  
  );
}
