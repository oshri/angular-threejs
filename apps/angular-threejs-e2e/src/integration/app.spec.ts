import { getGreeting } from '../support/app.po';

describe('threejs', () => {
  beforeEach(() => cy.visit('/'));

  describe('EYES', () => {
		it('should work', () => {
			cy.eyesOpen({
				appName: 'Eyes App'
			});
			cy.eyesCheckWindow({
				tag: 'Tag 1'
			});
			cy.eyesClose();
		});
	});
});
