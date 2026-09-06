import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({
  page,
  articleWithoutTags,
  viewArticlePage,
  editArticlePage,
}) => {
  const newDescription = faker.lorem.sentence(5);
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertDescriptionIsVisible(
    articleWithoutTags.description,
  );

  await editArticlePage.editDescriptionField(newDescription);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertDescriptionIsVisible(newDescription);
});
