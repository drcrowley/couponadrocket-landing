$(function () {
  $('.js-contacts-show').on('click', function() {
    var contacts = $('.tools__contacts');
    contacts.toggleClass('tools__contacts_hidden');
  });
});
