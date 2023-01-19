import { commiter } from "leafy-utils";

commiter.on("after_add_commit_push", () => {
	console.log(" ");
	console.log("Run this to publish package: ");
	console.log("  yarn publish --non-interactive");
	console.log(" ");
});

commiter.emit("add_commit_push", { silentMode: false });
