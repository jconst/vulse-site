"use strict";

var Refer = (function() {
  var appDownloadLink = "https://itunes.apple.com/us/app/vulse/id1226345714?mt=8";
  var baseURL = "https://api.apple-cloudkit.com/database/1/iCloud.com.jconst.Vulse/development";
  var code;
  var redirectURL;
  var ckSession;
  var ourId;

  var init = function(referCode) {
    code = referCode;
    console.log("logging code");
    console.log(code);
  }

  var toVulseId = function(iCloudId) {
    return "V" + iCloudId;
  }

  var buildURL = function(endpoint) {
    var url = `${baseURL}/${endpoint}?ckAPIToken=05a22b98755438c8165583a7a1f85757b794e1ddd6633b5be91e1e9c0829a51d`;
    if (ckSession) {
      url += `&ckSession=${encodeURIComponent(ckSession)}`;
    }
    return url;
  };

  var succeeded = function() {
    var button = $("#add-credit-button");
    button.text("Download Vulse");
    button.attr("href", appDownloadLink);
    $("#refer-title").text("Success!");
    $("#refer-body").text("Now just download Vulse to choose your free effect!");
  }

  var createReferral = function(referrerId) {
    if (ourId === referrerId) {
      alert("It looks like you might've clicked your own referral link. Try to get your friends to click it instead!");
      return;
    }

    var url = buildURL("private/records/modify");  
    var data = JSON.stringify({
      operations: [{
        operationType: "forceUpdate",
        record: {
          recordName: "PendingReferral", //make sure new referrals replace old ones
          recordType: "PendingReferral",
          fields: {
            "referrer": { 
              value: referrerId
            }
          }
        }
      }]
    });

    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      contentType: 'application/json',
      async: true,
      success: function(data) {
        succeeded();
      },
      error: function(req, name, error) {
        alert("Error while adding your credit to iCloud. Try refreshing the page.");
      }
    });
  }

  var fetchReferrer = function() {
    var url = buildURL("public/records/query");
    var data = JSON.stringify({
      query: {
        recordType: "VulseUser",
        filterBy: [{
          fieldName: "referCode",
          comparator: "EQUALS",
          fieldValue: { 
            value: code
          }
        }]
      }
    });

    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      contentType: 'application/json',
      async: true,
      success: function(data) {
        if (data.records.length == 0) {
          alert("Sorry! We couldn't find a user with that referral code. Ask your friend if they've changed their code.");
          return;
        }
        var referrerId = data.records[0].recordName;
        createReferral(referrerId);
      },
      error: function(req, name, error) {
        alert("Error while fetching the referrer's ID from iCloud. Try refreshing the page.");
      }
    });
  };

  var setupICloud = function(referCode) {
    var url = buildURL("private/users/current");

    $.getJSON(url, function(data) {
      ourId = toVulseId(data.userRecordName);
      fetchReferrer();
    }).fail(function(error) {
      redirectURL = error.responseJSON.redirectURL;
    });
  };

  var onClickAddCredit = function() {
    if (redirectURL) {
      window.open(redirectURL, '_blank', 'height=530,width=640');
      window.addEventListener('message', function(e) {
        ckSession = e.data.ckSession;
        setupICloud();
      });
      redirectURL = null;
    }
  };

  return {
    init: init,
    setupICloud: setupICloud,
    onClickAddCredit: onClickAddCredit
  }
})();
