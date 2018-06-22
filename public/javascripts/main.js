(($) => {
  const pathname = window.location.pathname;

  if (pathname === '/') {
    $('#login').show();
    $('#logout').hide();
    document.getElementById('add').disabled = true;
    $('.modal').on('shown.bs.modal', function () {
      $(this).find('[autofocus]').focus();
    });
  }

  if (pathname === '/homepage') {
    $('#logout').show();
    $('#login').hide();
    document.getElementById('add').disabled = false;

    // GET all user's rums from db to display
    const rumsTemplate = $('#rums-template').html();
    const compiledrumsTemplate = Handlebars.compile(rumsTemplate);

    $.ajax({
      type: 'GET',
      url: '/rums',
      success: (rums) => {
        $('#rums-in-journal').html(compiledrumsTemplate(rums));
      },
      error: (err) => {
        alert('Error getting rums!');
      },
    });
  }

  // POST new user
  $('#newUser').on('click', () => {
    const userInfo = {
      username: $('#username').val(),
      password: $('#password').val(),
    };

    $.ajax({
      type: 'POST',
      url: '/users',
      data: userInfo,
      success: (user) => {
        window.location.replace('/homepage');
        alert(`Welcome to Rum Journal ${user.user.username}!`);
      },
      error: () => {
        alert('Error adding user!');
      },
    });
  });

  // GET rum by id to show
  $('#rums-table').delegate('.modalButton', 'click', function () {
    const showRumTemplate = $('#show-rum-template').html();
    const compiledShowRumTemplate = Handlebars.compile(showRumTemplate);

    $.ajax({
      type: 'GET',
      url: `/add/${this.id}`,
      success: (rum) => {
        $('#show-rum').html(compiledShowRumTemplate(rum));
      },
      error: () => {
        alert('Error getting rum!');
      },
    });
  });

  // GET rum by id to edit
  $('#showRumModal').delegate('.modalButton', 'click', function () {
    const rumEditTemplate = $('#rum-edit-template').html();
    const compiledRumEditTemplate = Handlebars.compile(rumEditTemplate);

    $.ajax({
      type: 'GET',
      url: `/add/${this.id}`,
      success: (rum) => {
        $('#rum-modal-form').html(compiledRumEditTemplate(rum));
      },
      error: () => {
        alert('Error getting rum!');
      },
    });
  });

  // PATCH rum in db
  $('#saveRum').on('click', () => {
    const id = $('#edit-rumId').val();
    const rumInfo = {
      rumName: $('#edit-rumName').val(),
      distillery: $('#edit-distillery').val(),
      style: $('#edit-style').val(),
      country: $('#edit-country').val(),
      age: $('#edit-age').val(),
      price: $('#edit-price').val(),
      location: $('#edit-location').val(),
      rating: $('#edit-rating').val(),
      notes: $('#edit-notes').val(),
    };

    $.ajax({
      type: 'PATCH',
      url: `/add/${id}`,
      data: rumInfo,
      success: (rum) => {
        alert(`Updated ${rum.rum.rumName}`);
        window.location.reload();
      },
      error: () => {
        alert('Error saving rum!');
      },
    });
  });

  // DELETE rum in db
  $('#deleteRum').on('click', () => {
    const id = $('#edit-rumId').val();

    $.ajax({
      type: 'DELETE',
      url: `/add/${id}`,
      success: (rum) => {
        alert(`Deleted ${rum.rum.rumName}`);
        window.location.reload();
      },
      error: () => {
        alert('Error deleting rum!');
      },
    });
  });
})(jQuery);
