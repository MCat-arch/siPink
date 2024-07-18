/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/

//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});



    document.addEventListener('DOMContentLoaded', () => {
        // Function to fetch and display posts
        async function fetchPosts() {
            const postsContainer = document.getElementById('posts-container');
            if (!postsContainer) return;
    
            try {
                const response = await fetch('/post');
                const posts = await response.json();
    
                if (response.ok) {
                    postsContainer.innerHTML = ''; // Clear the container
                    posts.forEach(post => {
                        const postCard = document.createElement('div');
                        postCard.className = `col-md-4 post-card ${post.reportType} ${post.urgencyLevel} ${post.status}`;
                        postCard.id = post._id;
    
                        let mediaHTML = '';
                        post.mediaURLs.forEach(url => {
                            mediaHTML += `<img src="${url}" class="img-fluid mt-2" alt="Media">`;
                        });
    
                        postCard.innerHTML = `
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Laporan ${post.reportType.charAt(0).toUpperCase() + post.reportType.slice(1)}</h5>
                                    <p class="card-text post-content">${post.content}</p>
                                    <p class="card-text">Posted by: ${post.userName}</p>
                                    <div class="post-footer">
                                        <small><i class="fas fa-map-marker-alt"></i> ${post.location}</small>
                                        <small class="text-danger"><i class="fas fa-exclamation-circle"></i> ${post.urgencyLevel.charAt(0).toUpperCase() + post.urgencyLevel.slice(1)}</small>
                                    </div>
                                    ${mediaHTML}
                                </div>
                            </div>
                        `;
                        postsContainer.appendChild(postCard);
                    });
                } else {
                    alert(posts.message || 'Failed to load posts');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error occurred during fetching posts');
            }
        }
    
        fetchPosts();
    });


    document.addEventListener('DOMContentLoaded', function() {
        // Function to get current user data from local storage
        function getCurrentUser() {
            return JSON.parse(localStorage.getItem('currentUser'));
        }
    
        // Function to display current user profile information
        function displayUserProfile() {
            const user = getCurrentUser();
            if (user) {
                document.getElementById('profile-name').innerText = user.name;
                document.getElementById('profile-address').innerText = user.address;
            } else {
                window.location.href = 'login.html';
            }
        }
    
        // Function to load user posts from local storage
        function loadUserPosts() {
            const user = getCurrentUser();
            if (!user) return;
    
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const userPosts = posts.filter(post => post.userId === user.id);
            userPosts.forEach(post => addUserPostToPage(post));
        }
    
        // Function to add a post to the page
        function addUserPostToPage(post) {
            const userPostsContainer = document.getElementById('user-posts-container');
            
            const postCard = document.createElement('div');
            postCard.className = 'col-md-4 post-card';
            postCard.id = post.postId;
            
            const card = document.createElement('div');
            card.className = 'card';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.innerText = post.reportType.charAt(0).toUpperCase() + post.reportType.slice(1);
            
            const cardText = document.createElement('p');
            cardText.className = 'card-text post-content';
            cardText.innerText = post.content;
            
            const postFooter = document.createElement('div');
            postFooter.className = 'post-footer';
            
            const location = document.createElement('small');
            location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${post.location}`;
            
            const urgency = document.createElement('small');
            urgency.className = 'text-danger';
            urgency.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${post.urgencyLevel.charAt(0).toUpperCase() + post.urgencyLevel.slice(1)}`;
            
            postFooter.appendChild(location);
            postFooter.appendChild(urgency);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm mt-2';
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                deletePost(post.postId);
            });
            
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(postFooter);
            cardBody.appendChild(deleteButton);
            
            card.appendChild(cardBody);
            postCard.appendChild(card);
            
            userPostsContainer.appendChild(postCard);
        }
    
        // Function to delete a post
        function deletePost(postId) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = posts.filter(post => post.postId !== postId);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            
            // Remove the post from the page
            const postCard = document.getElementById(postId);
            if (postCard) {
                postCard.remove();
            }
        }
    
        // Load and display user profile and posts
        displayUserProfile();
        loadUserPosts();
    });
    
    



/*
    // Function to handle create post form submission
    const createPostForm = document.getElementById('create-post-form');
    if (createPostForm) {
        createPostForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const reportType = document.getElementById('reportType').value;
            const content = document.getElementById('content').value;
            const location = document.getElementById('location').value;
            const urgencyLevel = document.getElementById('urgencyLevel').value;
            const mediaURLs = document.getElementById('mediaURLs').value.split(',');

            try {
                const response = await fetch('/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reportType, content, location, urgencyLevel, mediaURLs })
                });
                const result = await response.json();

                if (response.ok) {
                    alert('Post created successfully!');
                    window.location.href = 'post.html';
                } else {
                    alert(result.message || 'Post creation failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error occurred during post creation');
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.querySelector('form');

    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = document.getElementById('post-content').value;
            const reportType = document.getElementById('report-type').value;
            const location = document.getElementById('location').value;
            const urgencyLevel = document.getElementById('urgency-level').value;
            const mediaFiles = document.getElementById('post-media').files;
            const user = JSON.parse(localStorage.getItem('currentUser'));

            const formData = new FormData();
            formData.append('content', content);
            formData.append('reportType', reportType);
            formData.append('location', location);
            formData.append('urgencyLevel', urgencyLevel);
            for (let i = 0; i < mediaFiles.length; i++) {
                formData.append('mediaFiles', mediaFiles[i]);
            }

            try {
                const response = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: formData
                });
                const result = await response.json();

                if (response.ok) {
                    alert('Post created successfully!');
                    window.location.href = 'post.html';
                } else {
                    alert(result.message || 'Failed to create post');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error occurred during post creation');
            }
        });
    }

    const postsContainer = document.getElementById('posts-container');

    if (postsContainer) {
        // Fetch posts from server
        async function fetchPosts() {
            try {
                const response = await fetch('http://localhost:3000/posts');
                const posts = await response.json();

                if (response.ok) {
                    posts.forEach(post => {
                        const postCard = document.createElement('div');
                        postCard.className = `col-md-4 post-card ${post.reportType} ${post.urgencyLevel} ${post.status}`;
                        postCard.id = post._id;

                        let mediaHTML = '';
                        post.mediaURLs.forEach(url => {
                            mediaHTML += `<img src="${url}" class="img-fluid mt-2" alt="Media">`;
                        });

                        postCard.innerHTML = `
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Laporan ${post.reportType.charAt(0).toUpperCase() + post.reportType.slice(1)}</h5>
                                    <p class="card-text post-content">${post.content}</p>
                                    <p class="card-text">Posted by: ${post.userName}</p>
                                    <div class="post-footer">
                                        <small><i class="fas fa-map-marker-alt"></i> ${post.location}</small>
                                        <small class="text-danger"><i class="fas fa-exclamation-circle"></i> ${post.urgencyLevel.charAt(0).toUpperCase() + post.urgencyLevel.slice(1)}</small>
                                    </div>
                                    ${mediaHTML}
                                </div>
                            </div>
                        `;
                        postsContainer.appendChild(postCard);
                    });
                } else {
                    alert(posts.message || 'Failed to load posts');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error occurred during fetching posts');
            }
        }

        fetchPosts();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch posts from localStorage
    function getPosts() {
        return JSON.parse(localStorage.getItem('posts')) || [];
    }

    // Display posts
    function displayPosts(posts) {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('col-md-4', 'post-card');
            postCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.reportType}</h5>
                        <p class="card-text post-content">${post.content}</p>
                        <p class="card-text">Posted by: ${post.userName}</p>
                        <div class="post-footer">
                            <small><i class="fas fa-map-marker-alt"></i> ${post.location}</small>
                            <small class="text-danger"><i class="fas fa-exclamation-circle"></i> ${post.urgencyLevel}</small>
                        </div>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    // Event delegation for category filter
    document.querySelector('.filter-nav').addEventListener('click', function(event) {
        if (event.target.classList.contains('filter-category')) {
            event.preventDefault();
            const category = event.target.dataset.category;
            const posts = getPosts().filter(post => post.reportType === category);
            displayPosts(posts);
        }
    });

    // Event delegation for status filter
    document.querySelector('.filter-nav').addEventListener('click', function(event) {
        if (event.target.classList.contains('filter-status')) {
            event.preventDefault();
            const status = event.target.dataset.status;
            const posts = getPosts().filter(post => post.status === status);
            displayPosts(posts);
        }
    });

    // Event listener for search functionality
    document.getElementById('search-posts').addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        const posts = getPosts().filter(post => 
            post.content.toLowerCase().includes(query) ||
            post.reportType.toLowerCase().includes(query) ||
            post.location.toLowerCase().includes(query)
        );
        displayPosts(posts);
    });

    // Initial display of posts (e.g., latest)
    displayPosts(getPosts());
});


//PROFIL
//PROFIL

// Function to get current user data from local storage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Function to display current user profile information
function displayUserProfile() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('profile-name').innerText = user.name;
        document.getElementById('profile-address').innerText = user.address;
    } else {
        window.location.href = 'login.html';
    }
}

// Function to load user posts from local storage
function loadUserPosts() {
    const user = getCurrentUser();
    if (!user) return;

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = posts.filter(post => post.userId === user.id);
    userPosts.forEach(post => addUserPostToPage(post));
}

// Function to add a post to the page
function addUserPostToPage(post) {
    const userPostsContainer = document.getElementById('user-posts-container');
    
    const postCard = document.createElement('div');
    postCard.className = 'col-md-4 post-card';
    postCard.id = post.postId;
    
    const card = document.createElement('div');
    card.className = 'card';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerText = post.reportType.charAt(0).toUpperCase() + post.reportType.slice(1);
    
    const cardText = document.createElement('p');
    cardText.className = 'card-text post-content';
    cardText.innerText = post.content;
    
    const postFooter = document.createElement('div');
    postFooter.className = 'post-footer';
    
    const location = document.createElement('small');
    location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${post.location}`;
    
    const urgency = document.createElement('small');
    urgency.className = 'text-danger';
    urgency.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${post.urgencyLevel.charAt(0).toUpperCase() + post.urgencyLevel.slice(1)}`;
    
    postFooter.appendChild(location);
    postFooter.appendChild(urgency);
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm mt-2';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
        deletePost(post.postId);
    });
    
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(postFooter);
    cardBody.appendChild(deleteButton);
    
    card.appendChild(cardBody);
    postCard.appendChild(card);
    
    userPostsContainer.appendChild(postCard);
}

// Function to delete a post
function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.filter(post => post.postId !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
    // Remove the post from the page
    const postCard = document.getElementById(postId);
    if (postCard) {
        postCard.remove();
    }
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    displayUserProfile();
    loadUserPosts();
});

*/


//// Fungsi untuk mendapatkan informasi pengguna dari localStorage
//function getUserProfile() {
//    return JSON.parse(localStorage.getItem('userProfile')) || {
//        name: 'Nama Pengguna',
//        address: 'Alamat Pengguna'
//    };
//}//

//// Fungsi untuk menyimpan informasi pengguna ke localStorage
//function saveUserProfile(profile) {
//    localStorage.setItem('userProfile', JSON.stringify(profile));
//}//

//// Fungsi untuk menampilkan informasi profil pengguna di halaman profil
//function displayUserProfile() {
//    const profile = getUserProfile();
//    document.getElementById('profile-name').innerText = profile.name;
//    document.getElementById('profile-address').innerText = profile.address;
//}//

//// Fungsi untuk menambahkan postingan pengguna ke halaman profil
//function addUserPostToPage(post) {
//    const userPostsContainer = document.getElementById('user-posts-container');
//    
//    const postCard = document.createElement('div');
//    postCard.className = 'col-md-4 post-card';
//    
//    const card = document.createElement('div');
//    card.className = 'card';
//    
//    const cardBody = document.createElement('div');
//    cardBody.className = 'card-body';
//    
//    const cardTitle = document.createElement('h5');
//    cardTitle.className = 'card-title';
//    cardTitle.innerText = post.type;
//    
//    const cardText = document.createElement('p');
//    cardText.className = 'card-text post-content';
//    cardText.innerText = post.content;
//    
//    const postFooter = document.createElement('div');
//    postFooter.className = 'post-footer';
//    
//    const location = document.createElement('small');
//    location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${post.location}`;
//    
//    const urgency = document.createElement('small');
//    urgency.className = 'text-danger';
//    urgency.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${post.urgency}`;
//    
//    postFooter.appendChild(location);
//    postFooter.appendChild(urgency);
//    
//    cardBody.appendChild(cardTitle);
//    cardBody.appendChild(cardText);
//    cardBody.appendChild(postFooter);
//    
//    card.appendChild(cardBody);
//    postCard.appendChild(card);
//    
//    userPostsContainer.appendChild(postCard);
//}//

//// Fungsi untuk memuat postingan pengguna dari localStorage ke halaman profil
//function loadUserPosts() {
//    const posts = getPosts();
//    posts.forEach(post => addUserPostToPage(post));
//}//

//// Memuat profil pengguna dan postingan saat halaman profil dibuka
//if (window.location.pathname.includes('profil.html')) {
//    displayUserProfile();
//    loadUserPosts();
//}//

//// Fungsi untuk memperbarui profil pengguna
//function updateUserProfile(name, address) {
//    const profile = {
//        name,
//        address
//    };
//    saveUserProfile(profile);
//}//

//// Contoh penggunaan fungsi updateUserProfile
//updateUserProfile('Nama Pengguna Baru', 'Alamat Pengguna Baru');//
//
