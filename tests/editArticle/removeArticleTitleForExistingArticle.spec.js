import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Remove an article title for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithTwoTags,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);

  await editArticlePage.editTitleField('');

  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
