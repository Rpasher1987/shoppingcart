var updateSubTotals = function() {
  var costArr = [];
  $('tbody tr').each(function (i, item) {
    var unitCost = parseFloat($(item).find('.unitCost').text());
    var quantity = parseFloat($(item).find('.quantity input').val());
    var subTotal = unitCost * quantity;
    if(quantity) {
      $(item).children('.subTotal').html(subTotal.toFixed(2));
      costArr.push(subTotal);
    } else {
      $(item).children('.subTotal').html('');
    }
  });
  var total = costArr.length > 0 ? costArr.reduce((sum, num) => sum + num) : 0;
  $('#totalCost').html(total.toFixed(2)); 
};

var addItem = function() {
  var newItem = $('#item').val();
  var newunitCost = parseFloat($('#unitCost').val()).toFixed(2);
  var newQuantity = parseFloat($('#quantity').val()).toFixed(2);
  if (!newItem || isNaN(newunitCost)) {
    alert('Enter an item and a price.');
  } else {
    $('#addItem').before("<tr><td class='item'>" + newItem + "</td><td class='unitCost'>" + newunitCost + "</td><td class='quantity'><input type='number'></input></td><td class='subTotal'></td><td><button class='btn btn-sm remove btn-danger'>Remove</button></td></tr>");  
  }
  $('tr').find('#item, #unitCost').val('');
};

var removeItem = function() {
  $(this).closest('tr').remove();
  updateSubTotals();
};

var updateQuantity = function () {
  clearTimeout(delay);
  var delay = setTimeout(updateSubTotals, 1000);
};

$(document).ready(function() {
  updateSubTotals();
  $(document).on('input', '.quantity', updateQuantity);
  $(document).on('click', '.remove', removeItem);
  $(document).on('click', '.add', addItem);
  $('#unitCost').on('keyup', function(event) {
    if (event.key === 'Enter') {
      addItem();
    }
  });
});
