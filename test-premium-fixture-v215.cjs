// Legacy feature tests exercise Premium controls, not entitlement verification.
// The dedicated v215 browser/server suites separately verify free and paid gates.
exports.installPremium215=async page=>page.addInitScript(()=>{
 addEventListener('DOMContentLoaded',()=>{window.aryPremiumActive214=()=>typeof profile!=='undefined'&&!!profile;});
});
