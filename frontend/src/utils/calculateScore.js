export function calculateScore(profileData, walletMetadata = {}) {
    if (!profileData || !profileData.account || !profileData.accountStats) {
      return 0;
    }
  
    // Extract values from Lens data
    const followers = profileData.accountStats.graphFollowStats.followers || 0;
    const posts = profileData.accountStats.feedStats.posts || 0;
    const comments = profileData.accountStats.feedStats.comments || 0;
    const collects = profileData.accountStats.feedStats.collects || 0;
    const tips = profileData.accountStats.feedStats.tips || 0;
  
    const reacted = profileData.accountStats.feedStats.reacted || 0;
    const reposts = profileData.accountStats.feedStats.reposts || 0;
    const quotes = profileData.accountStats.feedStats.quotes || 0;
    const engagement = reacted + reposts + quotes;
  
    // Off-chain values (optional)
    const walletAgeYears = walletMetadata.walletAgeYears || 0;
    const txVolumeEth = walletMetadata.txVolumeEth || 0;
  
    // Safe log function to avoid log(0)
    const safeLog = (n) => Math.log10(n + 1);
  
    // Weights for each metric
    const WEIGHTS = {
      followers: 20,
      posts: 15,
      comments: 10,
      collects: 15,
      tips: 20,
      engagement: 10,
      walletAgeYears: 5,
      txVolumeEth: 5
    };
  
    // Log-scaled scores
    const normalized = {
      followers: safeLog(followers),
      posts: safeLog(posts),
      comments: safeLog(comments),
      collects: safeLog(collects),
      tips: safeLog(tips),
      engagement: safeLog(engagement),
      walletAgeYears: safeLog(walletAgeYears),
      txVolumeEth: safeLog(txVolumeEth), // 
    };
  
    // Weighted sum of scores
    const score =
      normalized.followers * WEIGHTS.followers +
      normalized.posts * WEIGHTS.posts +
      normalized.comments * WEIGHTS.comments +
      normalized.collects * WEIGHTS.collects +
      normalized.tips * WEIGHTS.tips +
      normalized.engagement * WEIGHTS.engagement +
      normalized.walletAgeYears * WEIGHTS.walletAgeYears +
      normalized.txVolumeEth * WEIGHTS.txVolumeEth;
  
    return Math.round(score);
  }
  