function validateNews(){ 

    $("#error").html("");
    $("#response").html("");
    $("#response").hide();
    $("#responseServerErrs").html("");

    
    var email = $("input[name='email']" ).val();
   
    
    var errors = 0;
    

    

    if(email == "") {
        errors++;
        $("#email_error" ).html('<span>Please enter email address.</span>');
    }else {
        $("#email_error" ).html('');
    }

    if(email.length!=0) {
      if (IsEmail(email) == false) {
        errors++;
        $("#email_error" ).html('<span>Please enter valid email address.</span>');
      }else {
        $("#email_error" ).html('');
      }
    }

    
    
    if(parseInt(errors) == 0){
        $.ajax({url: 'api/news.php', //php variable is made in admin/teams/form.php then it is made in includes/common_footer.php file
                method: "post",
                data: $('#newsForm').serialize(), 
                success: function(result){ 
                    var resp  = $.parseJSON(result);
                    $("#response").html("");
                    $("#response").hide();
                        
                    if(typeof resp.success != "undefined" && resp.success == 1) {
                        //scroll_top();
                        restButtonClicked('newsForm');
                        $('#response').html(resp.messages);
                        $("#response").show();
                        $('#response').html('<span>' + resp.messages + "</span>");
                        
                    } else if(typeof resp.success != "undefined" && resp.success == 0) {
                        var errorMsgs = "";
                        $.each(resp.messages, function( index, value ) {                          
                            errorMsgs += "<li>"+value+"</li>";                          
                        });
                        
                        if(errorMsgs!="") {
                            //scroll_top();
                            errorMsgs = "<ul>"+errorMsgs+"</ul>";
                            $("#responseServerErrs").css('display', 'block').html(errorMsgs);
                        }
                    } else {
                        //scroll_top();
                        $('#responseServerErrs').css('display', 'block').html("<ul><li>Received unknown response</li></ul>");
                    }   
                }
            });
    } 
    return false;
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function restButtonClicked(formId){
    $('#'+formId).trigger("reset");
}