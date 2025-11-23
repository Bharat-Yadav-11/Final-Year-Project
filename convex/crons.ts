import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "delete any old files marked for deletion",
  { hours: 168 },
  internal.files.deleteAllFiles
);

export default crons;
