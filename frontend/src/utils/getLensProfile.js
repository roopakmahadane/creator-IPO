

export async function getLensProfileData(address) {

    const query = `
  query AccountData(
    $request: AccountRequest!
    $accountStatsRequest: AccountStatsRequest!
  ) {
    account(request: $request) {
      address
      metadata {
        name
        bio
      }
      username {
        id
        value
        namespace
        localName
      }
      score
    }
    accountStats(request: $accountStatsRequest) {
      graphFollowStats {
        followers
        following
      }
      feedStats {
        posts
        comments
        reposts
        quotes
        reacted
        reactions
        collects
        tips
      }
    }
  }
`;

const variables = {
  request: {
    address: address,
  },
  accountStatsRequest: {
    account: address,
  },
};


  try {
    const response = await fetch('https://api.lens.xyz/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    return json.data; // return only the useful data part
  } catch (error) {
    console.error('Error fetching Lens data:', error);
    return null;
  }
}
