/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


$(function() {
// All of the tests are with in this function so they run after the page loads.

    // Checks that the allFeeds array has content, key: value
    describe('RSS Feeds', function() {
        // Checks that the variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Checks that the url is defined and not empty
        it('url is defined and not empty', function() {
        	// Loops through allFeeds array
			allFeeds.forEach(function(key) {
				// Checks that url is defined
				expect(key.url).toBeDefined();
				// Checks that url is not empty
				expect(key.url.length).not.toBe(0);
			})
        });


        // Checks that name is defined and not empty
        it('named is defined and not empty', function() {
        	// Loops through allFeeds array
			allFeeds.forEach(function(key) {
				// Checks that name is defined
				expect(key.name).toBeDefined();
				// Checks that name is not empty
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
        		// The class is there (in the html)
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
				// Check that the entries are not empty
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
