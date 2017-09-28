(function($) {

  $(function() { //TODO: check if i need this wrapper thing
    var urlTemplate = "https://ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=vulse-20&marketplace=amazon&region=US&placement=B01GK4U8EW&asins=";

    $('.product-price').each(function(i, elt) {

      var prodId = $(elt).attr('product-id');
      if (prodId) {
        var amznUrl = urlTemplate + prodId;

        $.ajax({
           url: amznUrl,
           type: 'GET',
           success: function(data) {
             $(elt).html($(data).find('.price').html());
           }
        });
      }
    });
  });

})(jQuery);