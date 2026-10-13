// Existing browser flows explicitly open the new optional controls before using them.
exports.expandQuick210=async page=>{const details=page.locator('#quickOptions210');if(await details.count()&&!await details.evaluate(el=>el.open))await details.locator('summary').click();};
