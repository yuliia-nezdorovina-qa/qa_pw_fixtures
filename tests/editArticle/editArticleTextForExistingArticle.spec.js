import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Edit the article text for the existing article', async ({
  page,
  articleWithOneTag,
  viewArticlePage,
  editArticlePage,
}) => {
  const newText = faker.lorem.sentence(5);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);

  await editArticlePage.editTextField(newText);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});
