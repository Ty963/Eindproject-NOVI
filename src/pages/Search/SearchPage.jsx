import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button.jsx';
import { Input, Label } from '../../components/Input/Input.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card/Card.jsx';
import styles from './SearchPage.module.css';

export default function SearchPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('name');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/results?query=${encodeURIComponent(query)}&type=${searchType}`);
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardHeader>
                    <CardTitle>Search Cocktails</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className={styles.form}>
                        <div className={styles.formGroup}>
                            <Label htmlFor="search">What are you looking for?</Label>
                            <Input
                                id="search"
                                type="text"
                                placeholder="Enter cocktail name or ingredient..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <Label>Search by:</Label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="searchType"
                                        value="name"
                                        checked={searchType === 'name'}
                                        onChange={(e) => setSearchType(e.target.value)}
                                    />
                                    <span>Cocktail Name</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="searchType"
                                        value="ingredients"
                                        checked={searchType === 'ingredients'}
                                        onChange={(e) => setSearchType(e.target.value)}
                                    />
                                    <span>Ingredient</span>
                                </label>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className={styles.submitBtn}>
                            Search Cocktails
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
