import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Add the tag for the existing article without tags', async ({
  viewArticlePage,
  editArticlePage,
  page,
  articleWithoutTags,
}) => {
  const newTag = faker.lorem.word();
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.enterTagsField(newTag);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTagIsVisible(newTag);
  // BUG: тег зберігається на бекенді (підтверджено через Network → tagList у response),
  // але не відображається на сторінці статті без reload.
});
