const sharedInfo = require('./shared-module')
Object.defineProperty(exports, "__esModule", {
    value: true
});
module.exports = () => {
    return {
        noColors: true,
        currentFixture: null,

        report: {
            startTime: null,
            endTime: null,
            userAgents: null,
            passed: 0,
            total: 0,
            skipped: 0,
            fixtures: [],
            warnings: []
        },
        async reportTaskStart (startTime, userAgents, testCount) {
            this.report.startTime = startTime;
            this.report.userAgents = userAgents;
            this.report.total = testCount;
        },
        async reportFixtureStart (name, path, meta) {
            this.currentFixture = { name: name, path: path, meta: meta, tests: [] };
            this.report.fixtures.push(this.currentFixture);
        },
        async reportTestDone (name, testRunInfo, meta) {
            var _this = this;

            var errs = testRunInfo.errs.map(function (err) {
                return _this.formatError(err);
            });

            if (testRunInfo.skipped) this.report.skipped++;

            this.currentFixture.tests.push({
                name: name,
                meta: meta,
                errs: errs,

                durationMs: testRunInfo.durationMs,
                unstable: testRunInfo.unstable,
                screenshotPath: testRunInfo.screenshotPath,
                skipped: testRunInfo.skipped
            });
        },
        async reportTaskDone (endTime, passed, warnings, result) {
            this.report.testDetails = sharedInfo.sharedInfo
            this.report.passed = passed;
            this.report.endTime = endTime;
            this.report.warnings = warnings;

            this.write(JSON.stringify(this.report, null, 2));
        }
    };
};
