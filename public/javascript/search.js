/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

/**
 * Filters the list of API routes based on the search term entered by the user.
 * This function dynamically updates the visibility of route items by comparing
 * the search term against the method and path of each route. If the search term
 * matches any part of the HTTP method or path, the route will
 * remain visible; otherwise, it will be hidden.
 *
 * The function is invoked every time the user types in the search input field.
 *
 * @function
 * @returns {void}
 */
function filterRoutes() {
  const searchTerm = document.querySelector('.search').value.toLowerCase()

  const routes = document.querySelectorAll('.route-item')

  routes.forEach(function (route) {
    const method = route.querySelector('.method').textContent.toLowerCase()
    const path = route.querySelector('.path').textContent.toLowerCase()

    if (method.includes(searchTerm) || path.includes(searchTerm)) {
      route.style.display = 'flex'
    } else {
      route.style.display = 'none'
    }
  })
}
