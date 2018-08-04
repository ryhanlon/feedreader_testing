/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url is defined and not empty', function() {
			allFeeds.forEach(function(key) {
				expect(key.url).toBeDefined();
				expect(key.url.length).not.toBe(0);
			})
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('named is defined and not empty', function() {
			allFeeds.forEach(function(key) {
				expect(key.name).toBeDefined();
				expect(key.name.length).not.toBe(0);
			})
        });
    });

	// Checks that when the icon/hamburger is clicked that the menu appears and disappears
	describe('The Menu', function() {
		let bodyElement = $('body');
		let hamburger = $('.menu-icon-link');

        it('menu is hidden by default', function() {
        	// When page loads, menu is hidden
        	bodyElement.addClass('menu-hidden');
				expect(bodyElement.hasClass('menu-hidden')).toBe(true);
		});

		it('menu appears and disappears when icon clicked', ()=> {
			// First click removes the class and the menu appears
			hamburger.click();
			expect(bodyElement.hasClass('menu-hidden')).toBe(false);
			// Second click, returns the class so the menu disappears
			hamburger.click();
			expect(bodyElement.hasClass('menu-hidden')).toBe(true);
		});

     });

	// Check that when the feed is loaded it is not empty.
        describe('Initial Entries', () => {
        	// Before the test, load the feed, done before each test
			beforeEach(function(done) {
				loadFeed(0, function () {
					done();
				});
			});

        	it('a single entry within the .feed container', () => {
        		// Selectors, parent=.feed child=.entry
				let entries = $('.feed .entry');
				expect(entries.length).toBeGreaterThan(0);
			});
		});


        describe('New Feed Selection', () => {
        	// variables to store the html for both feeds
			let firstFeed,
			    secondFeed;

			// Check the length of allFeeds is at least 2 values
			it('another feed value exists', () => {
				expect(allFeeds.length).toBeGreaterThan(1);
			});

        	// Loads two feeds from the allFeeds array for testing.  Done before each test.
        	beforeEach(function(done) {
        		// Wait till done, store the loaded feed for future testing
				// Parameters are the index of the allFeeds array and the call-back function
        		loadFeed(1, function () {
					firstFeed = $('.feed').html();
					// Wait till done, store the loaded feed for future testing
					loadFeed(0, function() {
						secondFeed = $('.feed').html();
						done();
					});
        		});
			});
        	// Now two feeds are stored, check that the html content in each is different
			it('feed section has been loaded and is different', function() {
				expect(firstFeed).not.toBe(secondFeed);
			});
		});
}());
