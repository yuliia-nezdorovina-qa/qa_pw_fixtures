import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', async ({
  page,
  articleWithoutTags,
  viewArticlePage,
  editArticlePage,
}) => {
  const newTitle = faker.lorem.words();

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);

  await editArticlePage.editTitleField(newTitle);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
