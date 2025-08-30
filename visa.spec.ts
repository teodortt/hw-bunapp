import { test } from "@playwright/test";

// ID: AA00ETGHGX

test("test", async ({ page }) => {
  await page.goto("https://ceac.state.gov/genniv/");
  const imageSelector =
    "#c_default_ctl00_sitecontentplaceholder_uclocation_identifycaptcha1_defaultcaptcha_CaptchaImage";
  await page.waitForSelector(imageSelector);

  const elementHandle = await page.$(imageSelector);
  const imageBuffer = await elementHandle?.screenshot();

  if (!imageBuffer) {
    throw new Error("Failed to capture image screenshot");
  }
  const ocrText = await getOCRText(imageBuffer);

  await page.getByLabel("Select a Language").selectOption("SOF");
  await page.getByRole("textbox", { name: "Enter the Captcha" }).click();
  await page.getByRole("textbox", { name: "Enter the Captcha" }).fill(ocrText);
  await page.getByRole("link", { name: "START AN APPLICATION" }).click();
  await page.getByRole("checkbox", { name: "I AGREE" }).check();
  await page.goto(
    "https://ceac.state.gov/GenNIV/Common/ConfirmApplicationID.aspx?node=SecureQuestion"
  );
  await page.getByRole("textbox", { name: "Answer" }).click();
  await page.getByRole("textbox", { name: "Answer" }).fill("name");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("textbox", { name: "Surnames" }).click();
  await page.getByRole("textbox", { name: "Surnames" }).fill("Surnames");
  await page.getByRole("textbox", { name: "Given Names" }).click();
  await page.getByRole("textbox", { name: "Given Names" }).fill("Given names");
  await page
    .getByRole("textbox", { name: "Full Name in Native Alphabet" })
    .click();
  await page
    .getByRole("textbox", { name: "Full Name in Native Alphabet" })
    .fill("Fname native alphabet");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTelecodeQuestion_1")
    .check();
  await page.getByLabel("Sex").selectOption("M");
  await page.getByLabel("Marital Status").selectOption("S");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay")
    .selectOption("01");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth")
    .selectOption("JAN");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear")
    .fill("1990");
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("sofia");
  await page.getByRole("textbox", { name: "State/Province" }).click();
  await page.getByRole("textbox", { name: "State/Province" }).fill("sofia");
  await page.getByLabel("Country/Region").selectOption("BULG");
  await page.getByRole("button", { name: "Next: Personal" }).click();
  await page.getByLabel("Country/Region of Origin (").selectOption("BULG");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblAPP_OTH_NATL_IND_1")
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblPermResOtherCntryInd_1"
    )
    .check();
  await page
    .getByRole("textbox", { name: "National Identification Number" })
    .click();
  await page
    .getByRole("textbox", { name: "National Identification Number" })
    .fill("9000000000");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_SSN_NA")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_TAX_ID_NA")
    .check();
  await page.getByRole("button", { name: "Next: Travel" }).click();
  await page.getByLabel("Purpose of Trip to the U.S.").selectOption("J");
  await page.getByLabel("Specify").selectOption("J1-J1");
  await page.getByRole("radio", { name: "Yes" }).check();
  await page.getByRole("radio", { name: "No" }).check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay")
    .selectOption("1");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEMonth")
    .selectOption("1");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear")
    .fill("2025");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS")
    .fill("4");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEMonth")
    .selectOption("7");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay")
    .selectOption("20");
  await page.getByLabel("Person/Entity Paying for Your").selectOption("S");
  await page.getByRole("button", { name: "Next: Travel Companions" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_LOS_CD")
    .selectOption("M");
  await page.getByRole("button", { name: "Next: Travel Companions" }).click();
  await page.getByRole("radio", { name: "Yes" }).check();
  await page.getByText("Please correct all areas in").click();
  await page.getByRole("radio", { name: "No" }).check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay")
    .selectOption("20");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEMonth")
    .selectOption("8");
  await page.getByText("Intended Date of Arrival").dblclick();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear")
    .fill("2025");
  await page.getByText("Intended Length of Stay in U.").click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS")
    .fill("1");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_LOS_CD")
    .selectOption("M");
  await page.getByRole("textbox", { name: "Street Address (Line 1)" }).click();
  await page
    .getByRole("textbox", { name: "Street Address (Line 1)" })
    .fill("Miami");
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("miami");
  await page.getByLabel("State").selectOption("AS");
  await page.getByRole("textbox", { name: "ZIP Code" }).click();
  await page.getByRole("textbox", { name: "ZIP Code" }).fill("12345");
  await page.getByRole("button", { name: "Next: Travel Companions" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("radio", { name: "No" }).check();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Continue Application" }).click();
  await page
    .getByRole("button", { name: "Next: Previous U.S. Travel" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_TRAVEL_IND_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_IND_1")
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_REFUSED_IND_1"
    )
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblIV_PETITION_IND_1")
    .check();
  await page.getByRole("button", { name: "Next: Address & Phone" }).click();
  await page.getByRole("textbox", { name: "Street Address (Line 1)" }).click();
  await page
    .getByRole("textbox", { name: "Street Address (Line 1)" })
    .fill("miami");
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("miami");
  await page.getByRole("textbox", { name: "Street Address (Line 1)" }).click();
  await page.getByLabel("Country/Region").selectOption("BULG");
  await page.getByRole("textbox", { name: "Postal Zone/ZIP Code" }).click();
  await page
    .getByRole("textbox", { name: "Postal Zone/ZIP Code" })
    .fill("1234");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblMailingAddrSame_0")
    .check();
  await page.getByRole("textbox", { name: "Primary Phone Number" }).click();
  await page
    .getByRole("textbox", { name: "Primary Phone Number" })
    .fill("35981234456");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblAddPhone_1")
    .check();
  await page.getByRole("textbox", { name: "Email Address" }).click();
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill("test@abv.bg");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblAddEmail_1")
    .check();
  await page.getByLabel("Social Media Provider/Platform").selectOption("FCBK");
  await page
    .getByRole("textbox", { name: "Social Media Identifier" })
    .fill("fb_111");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblAddSocial_1")
    .check();
  await page.getByRole("button", { name: "Next: Passport" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_ADDR_STATE_NA")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_ADDR_STATE_NA")
    .uncheck();
  await page.getByRole("textbox", { name: "State/Province" }).click();
  await page.getByRole("textbox", { name: "State/Province" }).fill("State");
  await page.getByRole("textbox", { name: "Secondary Phone Number" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_MOBILE_TEL_NA")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_BUS_TEL_NA")
    .check();
  await page.getByRole("button", { name: "Next: Passport" }).click();
  await page.getByLabel("Passport/Travel Document Type").selectOption("R");
  await page.getByRole("textbox", { name: "Passport/Travel Document" }).click();
  await page
    .getByRole("textbox", { name: "Passport/Travel Document" })
    .fill("123456");
  await page.getByRole("checkbox", { name: "Does Not Apply" }).check();
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("Sofia");
  await page.getByRole("textbox", { name: "State/Province" }).click();
  await page.getByRole("textbox", { name: "State/Province" }).fill("Bulgaria");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEDay")
    .selectOption("01");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEMonth")
    .selectOption("01");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear")
    .fill("2024");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEDay")
    .selectOption("01");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEMonth")
    .selectOption("01");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_EXPIREYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_EXPIREYear")
    .fill("2028");
  await page.getByRole("radio", { name: "No" }).check();
  await page.getByRole("button", { name: "Next: U.S. Contact" }).click();
  await page.getByRole("textbox", { name: "Surnames" }).click();
  await page
    .getByRole("textbox", { name: "Surnames" })
    .fill("contact_surnames");
  await page.getByRole("textbox", { name: "Given Names" }).click();
  await page.getByRole("textbox", { name: "Given Names" }).fill("Given_names");
  await page.getByRole("textbox", { name: "Organization Name" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_ORG_NA_IND")
    .check();
  await page.getByLabel("Relationship to You").selectOption("C");
  await page.getByText("Back: Passport Save Next:").click();
  await page.getByRole("textbox", { name: "Surnames" }).click();
  await page.getByRole("textbox", { name: "Surnames" }).fill("contactsurnames");
  await page.getByRole("textbox", { name: "Given Names" }).click();
  await page.getByRole("textbox", { name: "Given Names" }).fill("Givennames");
  await page
    .getByRole("textbox", { name: "U.S. Street Address (Line 1)" })
    .click();
  await page
    .getByRole("textbox", { name: "U.S. Street Address (Line 1)" })
    .fill("usaddress");
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("iami");
  await page.getByLabel("State").selectOption("AL");
  await page.getByRole("textbox", { name: "Phone Number" }).click();
  await page.getByRole("textbox", { name: "Phone Number" }).fill("5551212121");
  await page.getByRole("textbox", { name: "Email Address" }).click();
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill("miamia123@abv.us");
  await page.getByRole("button", { name: "Next: Family" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_SURNAME")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_SURNAME")
    .fill("fathername");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_GIVEN_NAME")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_GIVEN_NAME")
    .fill("farhergivenname");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlFathersDOBDay")
    .selectOption("01");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlFathersDOBMonth")
    .selectOption("JAN");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxFathersDOBYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxFathersDOBYear")
    .fill("1970");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblFATHER_LIVE_IN_US_IND_1"
    )
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_SURNAME")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_SURNAME")
    .fill("mothername");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_lblMOTHER_GIVEN_NAME")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_GIVEN_NAME")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_GIVEN_NAME")
    .fill("mothergivenname");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBDay")
    .selectOption("01");
  await page.getByText("Date of Birth 01 02 03 04 05").nth(1).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBMonth")
    .selectOption("JAN");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxMothersDOBYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxMothersDOBYear")
    .fill("1970");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblMOTHER_LIVE_IN_US_IND_1"
    )
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblUS_IMMED_RELATIVE_IND_1"
    )
    .check();
  await page
    .getByRole("button", { name: "Next: Work/Education/Training" })
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblUS_OTHER_RELATIVE_IND_1"
    )
    .check();
  await page
    .getByRole("button", { name: "Next: Work/Education/Training" })
    .click();
  await page.getByLabel("Primary Occupation").selectOption("S");
  await page.goto(
    "https://ceac.state.gov/GenNIV/General/complete/complete_workeducation1.aspx?node=WorkEducation1"
  );
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page
    .getByRole("textbox", { name: "Present Employer or School" })
    .selectOption("S");
  await page.goto(
    "https://ceac.state.gov/GenNIV/General/complete/complete_workeducation1.aspx?node=WorkEducation1"
  );
  await page
    .getByRole("textbox", { name: "Present Employer or School" })
    .click();
  await page
    .getByRole("textbox", { name: "Present Employer or School" })
    .fill("school1");
  await page.getByRole("textbox", { name: "Street Address (Line 1)" }).click();
  await page
    .getByRole("textbox", { name: "Street Address (Line 1)" })
    .fill("school street");
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("sofia");
  await page
    .getByRole("cell", { name: "Present Work/Education/" })
    .getByRole("group")
    .click();
  await page.getByText("Start Date").click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlEmpDateFromDay")
    .selectOption("1");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_ddlEmpDateFromMonth")
    .selectOption("1");
  await page.getByText("Start Date 01 02 03 04 05 06").click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxEmpDateFromYear")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxEmpDateFromYear")
    .fill("2015");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_cbxCURR_MONTHLY_SALARY_NA"
    )
    .check();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("textbox", { name: "State/Province" }).click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_cbxWORK_EDUC_ADDR_STATE_NA"
    )
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_cbxWORK_EDUC_ADDR_POSTAL_CD_NA"
    )
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_cbxWORK_EDUC_ADDR_STATE_NA"
    )
    .uncheck();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_cbxWORK_EDUC_ADDR_POSTAL_CD_NA"
    )
    .uncheck();
  await page.getByText("State/Province Does Not Apply").click();
  await page.getByRole("textbox", { name: "State/Province" }).fill("sofia");
  await page.getByRole("textbox", { name: "Postal Zone/ZIP Code" }).click();
  await page
    .getByRole("textbox", { name: "Postal Zone/ZIP Code" })
    .fill("1111");
  await page.getByRole("button", { name: "Save" }).click();
  await page
    .getByRole("textbox", { name: "Briefly describe your duties:" })
    .click();
  await page
    .getByRole("textbox", { name: "Briefly describe your duties:" })
    .fill("duties");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("textbox", { name: "Phone Number" }).click();
  await page.getByRole("textbox", { name: "Phone Number" }).fill("088852342");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Continue Application" }).click();
  await page
    .getByRole("button", { name: "Next: Work/Education: Previous" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblPreviouslyEmployed_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblPreviouslyEmployed_0")
    .check();
  await page.getByRole("textbox", { name: "Employer Name" }).click();
  await page.getByRole("textbox", { name: "Employer Name" }).fill("employer1");
  await page
    .getByRole("textbox", { name: "Employer Street Address (Line 1)" })
    .click();
  await page
    .getByRole("textbox", { name: "Employer Street Address (Line 1)" })
    .fill("empstreetaddr");
  await page.getByRole("textbox", { name: "City" }).click();
  await page.getByRole("textbox", { name: "City" }).fill("sofia");
  await page.getByRole("textbox", { name: "State/Province" }).click();
  await page
    .getByRole("textbox", { name: "State/Province" })
    .fill("sofiastate");
  await page.getByRole("textbox", { name: "Postal Zone/ZIP Code" }).click();
  await page
    .getByRole("textbox", { name: "Postal Zone/ZIP Code" })
    .fill("1213");
  await page.getByRole("textbox", { name: "Telephone Number" }).click();
  await page
    .getByRole("textbox", { name: "Telephone Number" })
    .fill("087878776");
  await page.getByRole("textbox", { name: "Job Title" }).click();
  await page.getByRole("textbox", { name: "Job Title" }).fill("tech");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_cbxSupervisorSurname_NA"
    )
    .check();
  await page.getByRole("textbox", { name: "State/Province" }).click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_cbxSupervisorGivenName_NA"
    )
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateFromDay"
    )
    .selectOption("1");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateFromMonth"
    )
    .selectOption("1");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxEmpDateFromYear"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxEmpDateFromYear"
    )
    .fill("2015");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateToDay"
    )
    .selectOption("1");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateToMonth"
    )
    .selectOption("1");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxEmpDateToYear"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxEmpDateToYear"
    )
    .fill("2020");
  await page
    .getByRole("textbox", { name: "Briefly describe your duties:" })
    .click();
  await page
    .getByRole("textbox", { name: "Briefly describe your duties:" })
    .fill("duties");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblOtherEduc_1")
    .check();
  await page.getByRole("button", { name: "Next: Work/Education:" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblCLAN_TRIBE_IND_1")
    .check();
  await page.getByRole("textbox", { name: "Language Name" }).click();
  await page.getByRole("textbox", { name: "Language Name" }).fill("english");
  await page.getByRole("link", { name: "Add Another" }).click();
  await page
    .getByRole("cell", { name: "Language Name Add Another" })
    .getByLabel("Language Name")
    .click();
  await page
    .getByRole("cell", { name: "Language Name Add Another" })
    .getByLabel("Language Name")
    .fill("german");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl01_InsertButtonLANGUAGE"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblCOUNTRIES_VISITED_IND_1"
    )
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblORGANIZATION_IND_1")
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblSPECIALIZED_SKILLS_IND_1"
    )
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblMILITARY_SERVICE_IND_1"
    )
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblINSURGENT_ORG_IND_1")
    .check();
  await page
    .getByRole("button", { name: "Next: Security and Background" })
    .click();
  await page
    .getByRole("cell", { name: "Language Name Error Add" })
    .locator("div")
    .nth(1)
    .click();
  await page
    .getByRole("cell", { name: "Language Name Error Add" })
    .getByLabel("Language Name")
    .fill("english");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl02_DeleteButtonLANGUAGE"
    )
    .click();
  await page
    .getByRole("button", { name: "Next: Security and Background" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblDisease")
    .getByRole("cell", { name: "No" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblDisorder_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblDruguser_1")
    .check();
  await page
    .getByRole("button", { name: "Next: Security/Background Part" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblArrested")
    .getByRole("cell", { name: "No" })
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblControlledSubstances_1"
    )
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblProstitution_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblMoneyLaundering_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblHumanTrafficking_1")
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblAssistedSevereTrafficking_1"
    )
    .check();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_rblHumanTraffickingRelated_1"
    )
    .check();
  await page
    .getByRole("button", { name: "Next: Security/Background Part" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblIllegalActivity_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTerroristActivity_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTerroristSupport_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTerroristOrg_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTerroristRel_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblGenocide_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTorture_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblExViolence_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblChildSoldier_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblReligiousFreedom_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblPopulationControls_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblTransplant_1")
    .check();
  await page
    .getByRole("button", { name: "Next: Security/Background Part" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblImmigrationFraud_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblDeport_1")
    .check();
  await page
    .getByRole("button", { name: "Next: Security/Background Part" })
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblChildCustody_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblVotingViolation_1")
    .check();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_rblRenounceExp_1")
    .check();
  await page
    .getByText(
      "Back: Security/Background Part 4 Save Next: Student/Exchange Visa"
    )
    .click();
  await page.getByRole("button", { name: "Continue Application" }).click();
  await page
    .getByRole("button", { name: "Next: Student/Exchange Visa" })
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_SURNAME"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_SURNAME"
    )
    .fill("surnems");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_GIVEN_NAME"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_GIVEN_NAME"
    )
    .fill("given");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_LN1"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_LN1"
    )
    .fill("street123");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_CITY"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_CITY"
    )
    .fill("sofia");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_STATE"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_STATE"
    )
    .fill("sofia");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_POSTAL_CD"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_ADDR_POSTAL_CD"
    )
    .fill("12343");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_TEL"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_TEL"
    )
    .fill("0883234232");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_EMAIL_ADDR"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_EMAIL_ADDR"
    )
    .fill("email1@abv.bg");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_SURNAME"
    )
    .dblclick();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_SURNAME"
    )
    .fill("contact1surname");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_SURNAME"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_SURNAME"
    )
    .fill("contact2");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_GIVEN_NAME"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_GIVEN_NAME"
    )
    .fill("given");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .fill("street1221@abv.bg");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN2"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN2"
    )
    .press("CapsLock");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .dblclick();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .fill("");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .press("CapsLock");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .press("CapsLock");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .fill("streeat3121@abv.bg");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN2"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_CITY"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_CITY"
    )
    .fill("sofia");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_STATE"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_STATE"
    )
    .fill("sofia");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_POSTAL_CD"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_POSTAL_CD"
    )
    .fill("3213");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_TEL"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_TEL"
    )
    .fill("088554433");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_EMAIL_ADDR"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_EMAIL_ADDR"
    )
    .fill("email");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_ADDR_LN1"
    )
    .fill("streeaddr23");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_EMAIL_ADDR"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_EMAIL_ADDR"
    )
    .fill("emai234@abv.bg");
  await page.getByRole("button", { name: "Next: SEVIS" }).click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_SURNAME"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl00_tbxADD_POC_SURNAME"
    )
    .fill("contactsurname");
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_SURNAME"
    )
    .click();
  await page
    .locator(
      "#ctl00_SiteContentPlaceHolder_FormView1_dtlStudentAddPOC_ctl01_tbxADD_POC_SURNAME"
    )
    .fill("contacttwo");
  await page.getByRole("button", { name: "Next: SEVIS" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxSevisID")
    .fill("sevisid");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxProgram")
    .press("ArrowLeft");
  await page.getByRole("radio", { name: "No" }).check();
  await page.getByRole("button", { name: "Next: PHOTO" }).click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxSevisID")
    .click();
  await page
    .locator("#ctl00_SiteContentPlaceHolder_FormView1_tbxSevisID")
    .fill("N0123456789");
  await page.getByRole("button", { name: "Next: PHOTO" }).click();
});

// OCR Function
const getOCRText = async (imageBuffer: Buffer) => {
  const formData = new FormData();
  formData.append("type", "ocr");
  formData.append("lang", "eng");
  formData.append("retain", "true");
  const blob = new Blob([imageBuffer], { type: "image/jpeg" });
  formData.append("files", blob, "screenshot.jpg");

  const accessToken =
    "RWuS9P7dKtRyRi4CylQ1tk9kFARdyzN1OYT62UfIPESuxIR8X0nbmUPfR9bsPfCW";

  const response = await fetch(
    `https://backend.scandocflow.com/v1/api/documents/extract?access_token=${accessToken}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Upload failed:", errorText);
    process.exit(1);
  }

  const result = await response.json();
  const text =
    result.documents?.[0]?.textAnnotation?.Pages?.[0]?.Words?.[0]?.Text;

  console.log("Extracted OCR Text:", text);
  return text;
};
