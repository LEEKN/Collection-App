import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteButton from '../../components/FavoriteButton';
import { Text } from 'atomize';
import './Favorite.css';

interface Book {
  id: string;
  bookName: string;
  bookText: string;
  author: string;
  bookIcon: string;
  tag?: string;
}

const Favorite: React.FC = () => {
  const account = sessionStorage.getItem('user');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (account) {
      axios.get(`/api/favorite/${account}`)
        .then(res => {
          setBooks(res.data);
        })
        .catch(err => console.error('取得收藏清單失敗', err));
    }
  }, [account]);

  return (
    <div className="favorite-container">
      <Text tag="h2" textSize="30px" m={{ b: "2rem" }} textAlign="center">
        我的最愛
      </Text>
      <div className="favorite-flex">
        {books.length > 0 ? (
          books.map(book => (
            <div className="item" key={book.id}>
              <div className="image">
                <a href={`/books/${book.id}`}>
                  <img src={book.bookIcon} alt={book.bookName} />
                </a>
                {account && (
                  <FavoriteButton
                    bookId={book.id}
                    account={account}
                    defaultFavorited={true}
                    size={26}
                  />
                )}
              </div>
              <dl>
                <dt>
                  <span>{book.author}</span>
                  <a href={`/books/${book.id}`}>{book.bookName}</a>
                </dt>
                <dd>{book.bookText.length > 100 ? book.bookText.slice(0, 100) + '...' : book.bookText}</dd>
              </dl>
            </div>
          ))
        ) : (
          <Text tag="p" w="100%" textAlign="center" textSize="subheader" textColor="gray700">
            尚無收藏書籍。
          </Text>
        )}
      </div>
    </div>
  );
};

export default Favorite;
