$( document ).ready(function() {
 $("select.protection_plan").val($('.prot-selected.prot_plan_text').text());
});

$(document).on("click",".protection_plan-main .protection_plan-global .prot-selected",function(){
    $(this).siblings('ul').fadeToggle(300);
    $("div.protection_plan-global").toggleClass("opened");
});
$(document).on("click",".protection_plan-main .protection_plan-list li",function(){
  $(".protection_plan-main .protection_plan-global .prot-selected").text($(this).find('.prot_plan_text').text());
  $(this).parent('ul').fadeOut(300);
  $("div.protection_plan-global").removeClass("opened");
  if($('.protection_plan-global .prot-selected').text != 'Choose your protection plan' || $('.protection_plan-global .prot-selected').text != 'Do you want anti-stain protection ?' || $('.protection_plan-global .prot-selected').text != 'Choisissez votre plan de protection' || $('.protection_plan-global .prot-selected').text != 'Vous souhaitez une protection antitâche ?' )
  {
    $('.protection-plan-error').hide();
  }
  
  $("select.protection_plan").val($(this).find('.prot_plan_text').text());
   $('.protection_plan-main .protection_plan-list li').not(this).css('display','flex');
   $(this).css('display','none');
 
});


$(document).on("click", function (e) {
   if ($(e.target).is(".prot_plan_text") === false) { 
      if ($("div.protection_plan-global").hasClass("opened")  ) { 
       $("div.protection_plan-global").removeClass('opened');
       $('.protection_plan-list').hide();                                                             
      }
    } 
});

$(document).on('click','.addtocart_custombtn',function(e){
  e.preventDefault();
  _this8 = $(this);
  console.log('custom btn click');
   var selected_plan = $('.protection_plan').val();
  
     var timestamp_chk = Date.now();
     $('.input_prop').val(timestamp_chk);
    
    if(selected_plan == "Choose your protection plan" || selected_plan == "Do you want anti-stain protection ?" || selected_plan == "Choisissez votre plan de protection" || selected_plan == "Vous souhaitez une protection antitâche ?")
    { 
      $('.protection_plan-global').css('border-color', 'red');
      $('html, body').animate({
        scrollTop: $('.protection_plan-global').offset().top -100 
      }, 'slow');
      $('.protection-plan-error').show();
      setTimeout(function () {
        $('.protection_plan-global').css('border-color', 'black');
      },3000);
      return false;
    }
    
    if(selected_plan == "Decline protection plan" || selected_plan == "No" || selected_plan == "Plan de protection contre le refus" || selected_plan == "Aucun plan de protection" || selected_plan == "Non" ) 
    {
       $('.protection_property').html("<input type='hidden' class='protection__plan' value='true' name='properties[_no_plan]'>");

        var form_element = $(this).closest('form');
        var form_variantId = $(this).closest('form').find('[name="id"]').val();
        var form_qty = $(this).closest('form').find('[name="quantity"]').val();
     
        var dataSerialize = form_element.serialize();
      
          $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: dataSerialize,
            dataType: 'json',
            success:function(data) { 
            //console.log('success noplan ',data);
            
              document.documentElement.dispatchEvent(new CustomEvent('product:added', {
                  bubbles: true,
                  detail: {
                    variant:form_variantId,
                    quantity: form_qty
                  }
                }));
              
            },
            error:function(error){
            console.log(error);
            }
          });
    }

    if(selected_plan == "2 Year Protection plan" || selected_plan == "4 Year Protection plan" || selected_plan == "Yes" || selected_plan == "Plan de protection de 2 ans" || selected_plan == "Plan de protection de 4 ans" || selected_plan == "Oui")
    {
         var dataVid = parseInt($('.protection_plan option:selected').attr('data-vid'));
             var sku_val = $('.protection_plan option:selected').attr('data-sku');
            
             var Product_Name = $('.protection_plan option:selected').attr('data-prodHandle');
             var time_string = timestamp_chk.toString();
              var update_data = { 
                  'id': dataVid,
                  'quantity': 1,
                  'properties': {
                      'Warranty_product':'true',
                      'timestamp':time_string,
                      'Product_Name':Product_Name
                  }
              }
           // console.log(update_data,'update_data');
             
              var form_element = $(this).closest('form');
              var form_variantId = $(this).closest('form').find('[name="id"]').val();
              var form_qty = $(this).closest('form').find('[name="quantity"]').val();
              
              // _this8.closest('form').append('<input type="hidden" class="input_prop" value="true" name="properties[Garantie_ajoutee]">');
              // _this8.closest('form').append('<input type="hidden" class="input_prop" value="'+sku_val+'" name="properties[PTR]">');
      

               $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: update_data,
                dataType: 'json',
                success:function(data) { 
                 console.log('success main');

                  $('.protection_property').html("<input type='hidden' class='protection__plan' value='true' name='properties[Garantie_ajoutee]'>");
                  
                  var dataSerialize = form_element.serialize();
                  console.log(dataSerialize);
                  
                      $.ajax({
                      type: 'POST',
                      url: '/cart/add.js',
                      data: dataSerialize,
                      dataType: 'json',
                      success:function(data) { 
                      console.log('success ');

                        document.documentElement.dispatchEvent(new CustomEvent('product:added', {
                            bubbles: true,
                            detail: {
                              variant:form_variantId,
                              quantity: parseInt(form_qty)
                            }
                          }));
                        
                      },
                      error:function(error){
                      console.log(error);
                      }
                   });
                
                },
                error:function(error){
                  console.log(error);
                }
              });
        }
})

$(document).on("click", function (e) {
   if ($(e.target).is(".prot_plan_text") === false) { 
      if ($("div.protection_plan-global").hasClass("opened")  ) { 
       $("div.protection_plan-global").removeClass('opened');
       $('.protection_plan-list').hide();                                                             
      }
    } 
});

