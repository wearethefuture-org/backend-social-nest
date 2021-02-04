const generateThankYouEmail = (
  organisation = '',
  address = '',
  indificationNumber = '',
  OGRNIP = '',
  R_S = '',
  OGRN = '',
  Bank = '',
  BIK_Bank = '',
  INN_Bank = '',
  KORR_Bank = '',
  address_Bank = ''
) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="format-detection" content="telephone=no" />
    <!-- disable auto telephone linking in iOS -->
    <title>Sezam group thank you text</title>
    <style type="text/css">
      html {
        background-color: #e1e1e1;
        margin: 0;
        padding: 0;
      }
      body,
      #bodyTable,
      #bodyCell,
      #bodyCell {
        height: 100% !important;
        margin: 0;
        padding: 0;
        width: 100% !important;
        font-family: Helvetica, Arial, 'Lucida Grande', sans-serif;
      }
      table {
        border-collapse: collapse;
      }
      table[id='bodyTable'] {
        width: 100% !important;
        margin: auto;
        max-width: 500px !important;
        color: #7a7a7a;
        font-weight: normal;
      }
      img,
      a img {
        border: 0;
        outline: none;
        text-decoration: none;
        height: auto;
        line-height: 100%;
      }
      a {
        text-decoration: none !important;
        border-bottom: 1px solid;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: #5f5f5f;
        font-weight: normal;
        font-family: Helvetica;
        font-size: 20px;
        line-height: 125%;
        text-align: Left;
        letter-spacing: normal;
        margin-top: 0;
        margin-right: 0;
        margin-bottom: 10px;
        margin-left: 0;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
      }
      .ReadMsgBody {
        width: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      #outlook a {
        padding: 0;
      }
      img {
        -ms-interpolation-mode: bicubic;
        display: block;
        outline: none;
        text-decoration: none;
      }
      body,
      table,
      td,
      p,
      a,
      li,
      blockquote {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        font-weight: normal !important;
      } /* Prevent Windows- and Webkit-based mobile platforms from changing declared text sizes. */
      .ExternalClass td[class='ecxflexibleContainerBox'] h3 {
        padding-top: 10px !important;
      } /* Force hotmail to push 2-grid sub headers down */

      /* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */

      /* ========== Page Styles ========== */
      h1 {
        display: block;
        font-size: 26px;
        font-style: normal;
        font-weight: normal;
        line-height: 100%;
      }
      h2 {
        display: block;
        font-size: 20px;
        font-style: normal;
        font-weight: normal;
        line-height: 120%;
      }
      h3 {
        display: block;
        font-size: 17px;
        font-style: normal;
        font-weight: normal;
        line-height: 110%;
      }
      h4 {
        display: block;
        font-size: 18px;
        font-style: italic;
        font-weight: normal;
        line-height: 100%;
      }
      .flexibleImage {
        height: auto;
      }
      .linkRemoveBorder {
        border-bottom: 0 !important;
      }
      table[class='flexibleContainerCellDivider'] {
        padding-bottom: 0 !important;
        padding-top: 0 !important;
      }

      body,
      #bodyTable {
        background-color: #e1e1e1;
      }
      #emailHeader {
        background-color: #e1e1e1;
      }
      #emailBody {
        background-color: #ffffff;
      }
      #emailFooter {
        background-color: #e1e1e1;
      }
      .nestedContainer {
        background-color: #f8f8f8;
        border: 1px solid #cccccc;
      }
      .emailButton {
        background-color: #205478;
        border-collapse: separate;
      }
      .buttonContent {
        color: #ffffff;
        font-family: Helvetica;
        font-size: 18px;
        font-weight: bold;
        line-height: 100%;
        padding: 15px;
        text-align: center;
      }
      .buttonContent a {
        color: #ffffff;
        display: block;
        text-decoration: none !important;
        border: 0 !important;
      }
      .emailCalendar {
        background-color: #ffffff;
        border: 1px solid #cccccc;
      }
      .emailCalendarMonth {
        background-color: #205478;
        color: #ffffff;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: bold;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
      }
      .emailCalendarDay {
        color: #205478;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 60px;
        font-weight: bold;
        line-height: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
      }
      .imageContentText {
        margin-top: 10px;
        line-height: 0;
      }
      .imageContentText a {
        line-height: 0;
      }
      #invisibleIntroduction {
        display: none !important;
      }
      span[class='ios-color-hack'] a {
        color: #275100 !important;
        text-decoration: none !important;
      }
      span[class='ios-color-hack2'] a {
        color: #205478 !important;
        text-decoration: none !important;
      }
      span[class='ios-color-hack3'] a {
        color: #8b8b8b !important;
        text-decoration: none !important;
      }

      .a[href^='tel'],
      a[href^='sms'] {
        text-decoration: none !important;
        color: #606060 !important;
        pointer-events: none !important;
        cursor: default !important;
      }
      .mobile_link a[href^='tel'],
      .mobile_link a[href^='sms'] {
        text-decoration: none !important;
        color: #606060 !important;
        pointer-events: auto !important;
        cursor: default !important;
      }

      @media only screen and (max-width: 480px) {
        body {
          width: 100% !important;
          min-width: 100% !important;
        }
        table[id='emailHeader'],
        table[id='emailBody'],
        table[id='emailFooter'],
        table[class='flexibleContainer'],
        td[class='flexibleContainerCell'] {
          width: 100% !important;
        }
        td[class='flexibleContainerBox'],
        td[class='flexibleContainerBox'] table {
          display: block;
          width: 100%;
          text-align: left;
        }

        td[class='imageContent'] img {
          height: auto !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        img[class='flexibleImage'] {
          height: auto !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        img[class='flexibleImageSmall'] {
          height: auto !important;
          width: auto !important;
        }

        table[class='flexibleContainerBoxNext'] {
          padding-top: 10px !important;
        }

        table[class='emailButton'] {
          width: 100% !important;
        }
        td[class='buttonContent'] {
          padding: 0 !important;
        }
        td[class='buttonContent'] a {
          padding: 15px !important;
        }
      }

      @media only screen and (-webkit-device-pixel-ratio: 0.75) {
      }

      @media only screen and (-webkit-device-pixel-ratio: 1) {
      }

      @media only screen and (-webkit-device-pixel-ratio: 1.5) {
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
      }
    </style>
  </head>
  <body
    bgcolor="#E1E1E1"
    leftmargin="0"
    marginwidth="0"
    topmargin="0"
    marginheight="0"
    offset="0"
  >
    <center style="background-color: #e1e1e1">
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        id="bodyTable"
        style="
          table-layout: fixed;
          max-width: 100% !important;
          width: 100% !important;
          min-width: 100% !important;
        "
      >
        <tr>
          <td align="center" valign="top" id="bodyCell">
            <table
              bgcolor="#FFFFFF"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="500"
              id="emailBody"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="color: #ffffff"
                    bgcolor="#3498db"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="500"
                          class="flexibleContainer"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              width="500"
                              class="flexibleContainerCell"
                            >
                              <table
                                border="0"
                                cellpadding="30"
                                cellspacing="0"
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    class="textContent"
                                  >
                                    <h1
                                      style="
                                        color: #ffffff;
                                        line-height: 100%;
                                        font-family: Helvetica, Arial,
                                          sans-serif;
                                        font-size: 30px;
                                        font-weight: normal;
                                        margin-bottom: 5px;
                                        text-align: center;
                                      "
                                    >
                                      Спасибо за проявленный интерес к
                                      сотрудничеству!
                                    </h1>
                                    <h2
                                      style="
                                        text-align: center;
                                        font-weight: normal;
                                        font-family: Helvetica, Arial,
                                          sans-serif;
                                        font-size: 23px;
                                        margin-bottom: 10px;
                                        color: #205478;
                                        line-height: 135%;
                                      "
                                    >
                                      Наша команда вскоре свяжется с Вами!
                                    </h2>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td align="center" valign="top">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    bgcolor="#F8F8F8"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="500"
                          class="flexibleContainer"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              width="500"
                              class="flexibleContainerCell"
                            >
                              <table
                                border="0"
                                cellpadding="30"
                                cellspacing="0"
                                width="100%"
                              >
                                <tr>
                                  <td align="center" valign="top">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                    >
                                      <tr>
                                        <td valign="top" class="textContent">
                                          <h3
                                            mc:edit="header"
                                            style="
                                              color: #5f5f5f;
                                              line-height: 125%;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 20px;
                                              font-weight: normal;
                                              margin-top: 0;
                                              margin-bottom: 3px;
                                              text-align: left;
                                            "
                                          >
                                            Ваши данные:
                                          </h3>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            Наименование организации:
                                            ${organisation}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            Юридический адрес: ${address}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            ИНН: ${indificationNumber}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                          
                                          ОГРНИП: ${OGRNIP}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            Р/С: ${R_S}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                          ОГРН: ${OGRN}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                          Банк: ${Bank}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            БИК Банка: ${BIK_Bank}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            ИНН Банка: ${INN_Bank}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            КОРР Счет Банка: ${KORR_Bank}
                                          </div>
                                          <div
                                            mc:edit="body"
                                            style="
                                              text-align: left;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            Юридический адрес банка: ${address_Bank}
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td align="center" valign="top">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="500"
                          class="flexibleContainer"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              width="500"
                              class="flexibleContainerCell"
                            >
                              <table
                                border="0"
                                cellpadding="30"
                                cellspacing="0"
                                width="100%"
                              >
                                <tr>
                                  <td align="center" valign="top">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          class="textContent"
                                        >
                                          <div
                                            style="
                                              text-align: center;
                                              font-family: Helvetica, Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              margin-bottom: 0;
                                              margin-top: 3px;
                                              color: #5f5f5f;
                                              line-height: 135%;
                                            "
                                          >
                                            С уважением, команда Sezam!
                                          </div>
                                          <img
                                            src="http://sezam.shop/image/catalog/logo/favicon%202.png"
                                            width="210"
                                            class="flexibleImage"
                                            style="
                                              max-width: 10%;
                                              text-align: center;
                                            "
                                            alt="Text"
                                            title="Text"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>

`;

generateThankYouEmail();

const ref = document.querySelector('#email');

ref.insertAdjacentHTML('afterbegin', generateThankYouEmail());
