export function loadConfig () {
    const {REPORT_TITLE,REVENUE_THRESHOLD,OUTPUT_DIR} = process.env;
    if (!REPORT_TITLE) {
        throw new Error('REPORT_TITLE is not defined in the environment variables');
    }
    if (isNaN(parseFloat(REVENUE_THRESHOLD))) {
        throw new Error('REVENUE_THRESHOLD is not defined in the environment variables');
    }
    if (!OUTPUT_DIR) {
        throw new Error('OUTPUT_DIR is not defined in the environment variables');
    }
    return {
        title: REPORT_TITLE,
        threshold: parseFloat(REVENUE_THRESHOLD),
        outputDir: OUTPUT_DIR
    };
}