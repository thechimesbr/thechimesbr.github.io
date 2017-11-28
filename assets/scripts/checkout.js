//stripe card element initialization
var stripe = Stripe('pk_test_lKqXxxjVlZgibq3vyQtrkyW8');

var elements = stripe.elements();

var card = elements.create('card');

card.mount('#card-element');

card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    stripe.createToken(card).then(function (result) {
        if (result.error) {
            // Inform the customer that there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Send the token to your server
            stripeTokenHandler(result.token);
        }
    });

    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);


        //
        // // Submit the form
        console.log('res2', token);

        var formData = {
            customer_name: $('#customer_name').val(),
            email: $('#customer_email').val(),
            quantity: $('#quantity').val(),
            value: $('#value').val(),
            message: $('#message').val()
        };

        formData.amount = formData.quantity * formData.amount;

        $.ajax({
            type: 'POST',
            url: 'https://wt-85767222a036891b1cedd0909d84c5ff-0.run.webtask.io/webtask-stripe-order-test',
            headers: {
                stripeToken: token.id
            },
            data: formData,
            dataType: 'json'
        }).done(function (data) {
            console.log('data', data);
            if (data.statusCode == 200) {
                console.log('res3', data);
                $('#gift-card-form form').hide();
                $('#response').append('<div class="alert alert-success">' + data.message + '</div>')
            } else {
                console.log('err3', data.message);
                $('#gift-card-form form').hide();
                $('#response').append('<div class="alert alert-danger">' + data.message + '</div>')
            }
        });
    }

});

