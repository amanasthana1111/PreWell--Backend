import redisClient from "../DB/redisConnection.js";

const rateLimit = async (req, res, next) => {
  try {
    const ip = `rate:${req.ip}`;
    const no_of_req = await redisClient.incr(ip);
    if (no_of_req == 1) {
      redisClient.expire(ip, 120);
    }
    if (no_of_req > 20) {
      throw new Error("user Limit Exceeded");
    }
    next();
  } catch (err) {
    return res.json({
      message: "smething wrong " + err,
    });
  }
};

export default rateLimit;
