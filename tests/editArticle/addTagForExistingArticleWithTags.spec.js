import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Add the tag for the existing article with tags', async ({
  page,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  const newTag = faker.lorem.word();
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.enterTagsField(newTag);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTagIsVisible(newTag);
});
