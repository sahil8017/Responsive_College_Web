window.initializeHeaderScripts = function () {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Mobile dropdown toggles
    document.querySelectorAll('.dropdown-mobile button').forEach(button => {
        button.addEventListener('click', () => {
            const menu = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu-mobile').forEach(m => {
                if (m !== menu) {
                    m.classList.add('hidden');
                    m.previousElementSibling.setAttribute('aria-expanded', 'false');
                    m.previousElementSibling.querySelector('svg').classList.remove('rotate-180');
                }
            });

            // Toggle current
            menu.classList.toggle('hidden');
            button.setAttribute('aria-expanded', !isExpanded);
            button.querySelector('svg').classList.toggle('rotate-180');
        });
    });

    // Desktop Dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const menu = dropdown.querySelector('.dropdown-menu');

        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const isActive = menu.classList.contains('is-active');

            // Close all others
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) {
                    m.classList.remove('is-active');
                    m.previousElementSibling.classList.remove('is-active');
                    m.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (!isActive) {
                menu.classList.add('is-active');
                button.classList.add('is-active');
                button.setAttribute('aria-expanded', 'true');
            } else {
                menu.classList.remove('is-active');
                button.classList.remove('is-active');
                button.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Sub-dropdown handling
    document.querySelectorAll('.sub-dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth >= 1024) { // Only for desktop
                e.preventDefault();
                const menu = this.nextElementSibling;
                const isActive = menu.classList.contains('is-active');

                // Close other submenus at this level
                this.parentElement.parentElement.querySelectorAll('.sub-dropdown-menu').forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('is-active');
                        m.previousElementSibling.classList.remove('is-active');
                    }
                });

                // Toggle current
                if (!isActive) {
                    menu.classList.add('is-active');
                    this.classList.add('is-active');
                } else {
                    menu.classList.remove('is-active');
                    this.classList.remove('is-active');
                }
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            m.classList.remove('is-active');
            if (m.previousElementSibling) {
                m.previousElementSibling.classList.remove('is-active');
                m.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });
        document.querySelectorAll('.sub-dropdown-menu').forEach(m => {
            m.classList.remove('is-active');
            m.previousElementSibling.classList.remove('is-active');
        });
    });

    // Prevent dropdown from closing when clicking inside
    document.querySelectorAll('.dropdown-menu, .sub-dropdown-menu').forEach(menu => {
        menu.addEventListener('click', e => e.stopPropagation());
    });
};
