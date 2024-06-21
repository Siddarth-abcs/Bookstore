import React from 'react'

export const Footer = () => {
  return (
<footer class="bg-gray-200 pt-4 text-center">
  <div class="container mx-auto p-4">
    <div class="flex flex-wrap justify-between">
      <div class="w-full md:w-1/3 xl:w-1/4 mb-2 md:mb-0">
        <p class="text-lg text-gray-600">&copy; 2024 BooksToHome | Designed & Developed by BookToHome</p>
      </div>
      <div class="w-full md:w-1/3 xl:w-1/4 mb-4 md:mb-0">
        <ul class="list-none mb-0 text-base">
          <li><a href="#" class="text-gray-600 hover:text-gray-900"><span className='mx-2'>Track Order</span> <span className='mx-2'>Contact</span> <span className='mx-2'>Terms And Conditions</span></a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900"><span className='mx-2'>Terms & Conditions</span> <span className='mx-2'>Sitemap</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
  )
}
