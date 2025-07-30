/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

const { describe, it } = require('mocha');
const assert = require('assert');

describe('LLM Integration', () => {
  describe('send-to-llm helper', () => {
    it('should have proper exit conditions for missing API key', async () => {
      // Mock sails helper
      const mockSails = {
        helpers: {
          cards: {
            sendToLlm: require('../../../api/helpers/cards/send-to-llm'), // eslint-disable-line global-require
          },
        },
        log: {
          warn: () => {},
          error: () => {},
        },
      };

      // Set up global sails mock
      global.sails = mockSails;

      // Test with no API key
      delete process.env.GROQ_API_KEY;

      const helper = mockSails.helpers.cards.sendToLlm;

      // Mock inputs
      const inputs = {
        card: {
          name: 'Test Card',
          description: 'Test description',
          type: 'project',
        },
        list: {
          name: 'Test List',
          type: 'normal',
        },
        board: {
          name: 'Test Board',
        },
      };

      try {
        await helper.fn(inputs);
        assert.fail('Expected configError to be thrown');
      } catch (error) {
        assert.equal(error, 'configError');
      }
    });

    it('should structure response correctly when API key is present', async () => {
      // Test structure validation only (don't make actual API calls)
      const helper = require('../../../api/helpers/cards/send-to-llm'); // eslint-disable-line global-require

      // Check that the helper has proper structure
      assert(helper.inputs);
      assert(helper.exits);
      assert(helper.fn);

      // Check inputs structure
      assert(helper.inputs.card);
      assert(helper.inputs.list);
      assert(helper.inputs.board);

      // Check exits structure
      assert(helper.exits.success);
      assert(helper.exits.apiError);
      assert(helper.exits.configError);
    });
  });

  describe('Card model extension', () => {
    it('should include llmResponse field', () => {
      const Card = require('../../../api/models/Card'); // eslint-disable-line global-require

      assert(Card.attributes);
      assert(Card.attributes.llmResponse);
      assert.equal(Card.attributes.llmResponse.type, 'json');
      assert.equal(Card.attributes.llmResponse.columnName, 'llm_response');
    });
  });
});
